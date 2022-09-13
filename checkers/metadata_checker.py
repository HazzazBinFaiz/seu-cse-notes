#!/usr/bin/env python3

from os import scandir

path_to_scan = "../notes"

required_meta_keys = ['title', 'faculty', 'date', 'prepared_by', 'contributed_by']

def scantree(path):
    for entry in scandir(path):
        if entry.is_dir(follow_symlinks=False):
            yield from scantree(entry.path) 
        else:
            yield entry



def check():
    for file in scantree(path_to_scan):
        if file.name.endswith('.md') and not file.name.endswith('README.md'):
            print(file.name)
            with open(file.path, 'rb') as note:
                lines = list(map(lambda line : line.decode('utf-8').strip(), note.readlines()))

                if not lines[0].startswith('---'):
                    raise Exception('Note must start with metadata')

                metadata_end_index = lines[1:].index('---')
                metadata = lines[1:metadata_end_index+1]


                meta_keys = [data.split(':')[0] for data in metadata]
                missing_keys = [key for key in required_meta_keys if key not in meta_keys]
                if len(missing_keys):
                    raise Exception('Required meta key(s) {} is missing.'.format(','.join(missing_keys)))


if __name__ == '__main__':
    check()
    print('Everything is fine :)')
