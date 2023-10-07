1.1. Написать скрипт определяющий запущен ли скрипт от имени пользователя root.
```bash 
#!/bin/bash

if [ "$(id -u)"="0" ]; then
  echo "prima you are root"
else
  echo "You are not root"
fi
```

1.2. Написать скрипт, который выводит текущую дату и время в формате:
2023-07-20 12:00:00
```bash
#!/bin/bash

now="$(date +'%Y-%m-%d %H:%M:%S')"
printf "$now"
```

1.3. Написать скрипт, который создает новый каталог с именем my_new_dir и переходит в
него.
```bash
#!/bin/bash

dir_name="my_new_dir"
mkdir "$dir_name"
cd "$dir_name"
pwd
```

1.4. Написать скрипт, который копирует файл my_file.txt из каталога ~/ в каталог /tmp
```bash
#!/bin/bash

target="$HOME/my_file.txt"
destination="/tmp"
cp "$target" "$destination"
echo "file successfully copied to destination folder: $destination"
```

1.5. Написать скрипт, который удаляет файл my_file.txt из каталога ~/
```bash
#!/bin/bash

target="$HOME/my_file.txt"
rm "$target"
echo "file successfully removed from $HOME diraectory: $destination"
```

1.6. Написать скрипт, который выводит список файлов в каталоге ~/
```bash
#!/bin/bash

ls -l "$HOME"
```

1.7. Написать скрипт, который запрашивает у пользователя имя файла и выводит его
содержимое.
Введите имя файла: my_file.txt
Содержимое файла my_file.txt:
Hello, world!
```bash
#!/bin/bash

read -p "Введите имя файла: " file_name

echo "Содержимое файла '$file_name':"
cat "$file_name"
```

1.8. Написать скрипт, который запрашивает у пользователя имя каталога и выводит
список файлов в нем.
Введите имя каталога: /home/user
Файлы в каталоге /home/user:
my_file.txt
my_other_file.txt
```bash
#!/bin/bash

read -p "Введите имя каталога: " dir_name

echo "Содержимое каталога '$dir_name':"
ls -1 "$dir_name"
```

1.9. Написать скрипт, который запрашивает у пользователя имя файла и выводит его
содержимое. Если файла не существует, вывести сообщение об ошибке.
```bash
#!/bin/bash

read -p "Введите имя файла: " file_name

if [ -f "$file_name" ]; then
    echo "Содержимое файла '$file_name':"
    cat "$file_name"
else
    echo "Файл '$file_name' не найден."
fi
```

1.10. Написать скрипт, который запрашивает у пользователя имя каталога и выводит
список файлов в нем. Если каталог не существует, вывести сообщение об ошибке
```bash
#!/bin/bash

read -p "Введите имя каталога: " dir_name

if [ -d "$dir_name" ]; then
    echo "Содержимое каталога '$dir_name':"
    ls -1 "$dir_name"
else
    echo "Каталог '$dir_name' не найден."
fi
```

1.11. Написать скрипт, который запрашивает у пользователя имя файла и заменяет все
вхождения строки error строкой warning. Если файла не существует, вывести сообщение
об ошибке
```bash
#!/bin/bash

read -p "Введите имя файла: " file_name

if [ -f "$file_name" ]; then
    sed -i 's/error/warning/g' "$file_name"
    echo "Все вхождения 'error' были заменены на 'warning' в файле '$file_name'."
else
    echo "Файл '$file_name' не найден."
fi
```

1.12. Написать скрипт, который ищет файлы по заданному шаблону: все файлы
содержащие текст error в каталоге с логами /var/log. Если файлы не найдены, вывести
сообщение об ошибке
```bash
#!/bin/bash

log_directory="/var/log"

search_text="error"

found_files=$(grep -rl "$search_text" "$log_directory")

if [ "$found_files" ]; then
    echo "Найдены файлы содержащие '$search_text' в каталоге '$log_directory':"
    echo "$found_files"
else
    echo "Файлы с текстом '$search_text' в каталоге '$log_directory' не найдены."
fi
```

1.13. * Вам нужно разработать Bash-скрипт для создания менеджера свободного места на
диске, который будет следить за использованием дискового пространства на вашем
компьютере и предоставлять информацию о статистике использования свободного
места. Скрипт должен включать следующие функциональности:
Отображение текущей статистики: Скрипт должен выводить информацию о текущем
использовании свободного места на всех монтируемых дисках.
Предупреждения о нехватке места: Если свободное место на каком-либо диске
опускается ниже заданного порога, скрипт должен отправлять предупреждение,
например, по электронной почте или в лог-файл.
Очистка устаревших файлов: Скрипт должен предоставлять опцию для
автоматической очистки устаревших или временных файлов на выбранном диске,
чтобы освободить дополнительное место.
Логирование: Скрипт должен вести лог, в котором записываются события, связанные
с управлением свободным местом, включая предупреждения и операции по очистке.
Использование функций и циклов: Скрипт должен быть разбит на функции для
выполнения различных задач и использовать циклы для обхода дисков и анализа
статистики.
Обработчик case для аргументов: Используйте оператор case для обработки
аргументов командной строки и выполнения соответствующих действий.
```bash
#!/bin/bash

threshold_percent=20
threshold_days=30
log_warn="/var/log/disk_logger_warn.txt"
log_clean="/var/log/disk_logger_clean.txt"

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

while true; do
    for disk in "${disks[@]}"; do
        usage_percent="$(df -h $disk | awk 'NR==2 {sub(/%/, "", $5); print $5}')"
        clean_files "$disk" "$threshold_days"
        send_warning "$disk" "$usage_percent" "$threshold_percent"
    done
    #цикл повтаряется каждый час
    sleep 3600
done
```

как запустит
```sudo ./script.sh -p 20 -d 1```

скрипт также может быть запущен через crontab, но будет небольшое изменение
```bash
#надо убат безконечный цикл
#while true; do
    for disk in "${disks[@]}"; do
        usage_percent="$(df -h $disk | awk 'NR==2 {sub(/%/, "", $5); print $5}')"
        clean_files "$disk" "$threshold_days"
        send_warning "$disk" "$usage_percent" "$threshold_percent"
    done
    #цикл повтаряется каждый час
#    sleep 3600
#done
```

тепер скрипт нужно добавит в crontab
```bash
sudo crontab -e
0 * * * * /path/to/your/script.sh -p 20 -d 1
```









