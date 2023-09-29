import os
import zipfile

ROOT_FOLDER = r'C:\Data\Dev\Fullstack\NextLMS'

FILE_TYPES = ['.js', '.ts', '.tsx', '.prisma', '.json']
EXCLUDE_FOLDERS = ['.next', 'node_modules', '.vscode', '.git']


def get_source_files(root_dir):
    file_paths = []
    
    for root, dirs, files in os.walk(root_dir):
        if any(folder in root for folder in EXCLUDE_FOLDERS):
            continue
            
        for file in files:
            if file.lower().endswith(tuple(FILE_TYPES)):
                file_path = os.path.join(root, file)
                
                # Get relative path to root folder
                relative_path = os.path.relpath(file_path, ROOT_FOLDER) 
                
                file_paths.append(relative_path)
                
    return file_paths


def zip_files(file_paths, zip_path):
    with zipfile.ZipFile(zip_path, 'w') as zip_file:
        for file in file_paths:
            zip_file.write(file)


if __name__ == '__main__':
    source_files = get_source_files(ROOT_FOLDER)
    
    zip_path = os.path.join(ROOT_FOLDER, 'source.zip')
    zip_files(source_files, zip_path)