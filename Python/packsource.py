import os
import json
import re
import zlib
import base64
from jsmin import jsmin

# Specify the directory you want to start from
rootDir = '.'
file_types = ['.js', '.jsx', '.ts', '.tsx', '.prisma']

# Directories to exclude
exclude_dirs = ['.github', '.husky', '.vscode', '.next', 'node_modules']

# File specifications to include
include_filespec = ['quiz', 'video', 'question', 'gpt', 'schema']

# Flag to control whether to include all files or only those specified by include_filespec
include_all_files = True

data = []
total_tokens = 0

for dirName, subdirList, fileList in os.walk(rootDir):
    # Skip directories in exclude_dirs
    if any(ed in dirName for ed in exclude_dirs):
        continue
    for fname in fileList:
        if any(fname.endswith(ft) for ft in file_types):
            # If include_all_files is True, include the file
            # Otherwise, check if any of the included file specifications is in the combined path
            if include_all_files or any(fs in os.path.join(dirName, fname) for fs in include_filespec):
                print(f"Processing file: {os.path.join(dirName, fname)}")
                
                with open(os.path.join(dirName, fname), 'r') as file:
                    file_contents = file.read()
                    
                    if not fname.endswith('.prisma'):
                        # Replace newlines with spaces
                        file_contents = file_contents.replace('\n', ' ')
                        # Minify the JavaScript/TypeScript code
                        file_contents = jsmin(file_contents)
                    else:
                        # For .prisma files, remove extraneous spaces and newlines
                        file_contents = re.sub(r'\s+', ' ', file_contents).strip()
                    
                    # Count the number of tokens in the minified code
                    total_tokens += len(file_contents.split())

                    # Create a dictionary for each file
                    file_data = {
                        'path': dirName,
                        'filename': fname,
                        'content': file_contents
                    }
                    # Add the file data to the list
                    data.append(file_data)

print(f"Total number of tokens: {total_tokens}")

# Ensure the Python/output directory exists
os.makedirs('Python\\output', exist_ok=True)

# Write the data to a JSON file in the Python/output directory
with open('Python\\output\\file_data.json', 'w') as json_file:
    json.dump(data, json_file)

print("Compression and encoding completed. Output written to Python\\output\\file_data.json.")