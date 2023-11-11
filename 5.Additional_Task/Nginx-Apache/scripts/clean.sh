#!/bin/bash

threshold_days=14
threshold_size=+5M
log_warn="/var/log/disk_logger_warn.log"
log_clean="/var/log/disk_logger_clean.log"

clean_files_dir="/tmp"

echo_message(){
    local message="$1"
    local path="$2"
    echo "$message"
    echo "$message" >> "$path"      
}

clean_files() {
    
    local duration="$1"
    local size="$2"
    
    message="Начало очистки устаревших файлов в $clean_files_dir"
    echo_message "$message" "$log_clean"

    my_command="find $clean_files_dir -type f -mtime -$duration -size $2"
    echo_message "$($my_command)" "$log_clean"
    my_command="$my_command -exec rm -f {} \;"
    eval $my_command
    message="Очистка завершена"
    echo_message "$message" "$log_clean"
}

while getopts s:d: flag
do
    case "${flag}" in
        s) threshold_size=${OPTARG};;
        d) threshold_days=${OPTARG};;
    esac
done

clean_files "$threshold_days" "$threshold_size"