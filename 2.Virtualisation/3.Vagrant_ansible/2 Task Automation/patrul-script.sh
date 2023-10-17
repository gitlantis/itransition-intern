#!/bin/bash

threshold_percent=20
threshold_days=30
log_warn="/var/log/disk_logger_warn.log"
log_clean="/var/log/disk_logger_clean.log"

clean_files_dirs=("/var/log" "/tmp")
disks="$(df -H --output=source,target | grep -E -w -v 'none' | grep -oE '/mnt/[^ ]+')"

echo_message(){
    local message="$1"
    local path="$2"
    echo "$message"
    echo "$message" >> "$path"
}

send_warning() {

    local disk="$1"
    local usage_percent="$2"
    local percent="$3"

    if [ "$((100-usage_percent))" -lt "$percent" ]; then
        message="Предупреждение: Свободное место на диске $disk ниже $percent% (сейчас $percent%)"
        echo_message "$message" "$log_warn"
    fi
}

clean_files() {

    local disk="$1"
    local duration="$2"

    for clean_files_dir in "${clean_files_dirs[@]}"; do
        message="Начало очистки устаревших файлов в $clean_files_dir"
        echo_message "$message" "$log_clean"

        my_command="find $disk/$clean_files_dir -type f -mtime -$duration"
        echo_message "$($my_command)" "$log_clean"
        my_command="$my_command -exec rm -f {} \;"
        eval $my_command
    done
    message="Очистка завершена"
    echo_message "$message" "$log_clean"
}

while getopts p:d: flag
do
    case "${flag}" in
        # p опция означает "percent" поумолмчанию равно ниже 20%
        p) threshold_percent=${OPTARG};;
        # d опция означает "duration to clean" поумолмчанию равно болье 30и дней
        d) threshold_days=${OPTARG};;
    esac
done

for disk in "${disks[@]}"; do
    usage_percent="$(df -h $disk | awk 'NR==2 {sub(/%/, "", $5); print $5}')"
    #clean_files "$disk" "$threshold_days"
    send_warning "$disk" "$usage_percent" "$threshold_percent"
done