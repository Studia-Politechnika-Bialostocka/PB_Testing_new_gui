import subprocess
import os


def validity_command(command, project_name):
    url_check_command = command

    process = subprocess.Popen(url_check_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    process.wait(timeout=10)

    if process.returncode != 0:
        print(f"{project_name} Project? No")
        return False
    return True


def execute_command_and_put_into_file(command, column_read):
    stream = os.popen(command)

    with open("resources_for_testing/url.txt", 'w') as file:
        for word in stream.readlines():
            urls = word.split()[column_read]
            file.write(urls)
            file.write("\n")


def execute_command_and_put_into_file_rails(command, column_read):
    stream = os.popen(command)
    format_string = '(.:format)'
    with open("resources_for_testing/url.txt", 'w') as file:
        for word in stream.readlines():
            checked_line = word.split()
            if len(checked_line) <= 2 or checked_line[1] != 'GET':
                continue
            urls = checked_line[column_read]
            if format_string in urls:
                urls = urls.strip(format_string)
            file.write(urls)
            file.write("\n")