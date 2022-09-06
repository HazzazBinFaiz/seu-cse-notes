#!/usr/bin/env python3

from os import scandir

path_to_scan = "../notes"

required_meta_keys = ['title', 'faculty', 'date', 'prepared_by', 'contributor']

def scantree(path):
    for entry in scandir(path):
        if entry.is_dir(follow_symlinks=False):
            yield from scantree(entry.path) 
        else:
            yield entry


def check():
    for file in scantree(path_to_scan):
        if file.name.endswith('.md') and not file.name.endswith('README.md'):
            with open(file.path, 'rb') as note:
                lines = list(map(lambda line : line.decode('utf-8').strip(), note.readlines()))
                yaml_start_index = lines.index('```yaml')
                yaml_end_index = lines.index('```')
                metadata = lines[yaml_start_index+1:yaml_end_index]
                meta_keys = [data.split(':')[0] for data in metadata]
                missing_keys = [key for key in required_meta_keys if key not in meta_keys]
                if len(missing_keys):
                    raise Exception('Required meta key(s) {} is missing.'.format(','.join(missing_keys)))


if __name__ == '__main__':
    check()
    print('Everything is fine :)')
