# До рефакторинга
def process_data(data):
    # Обработка данных
    for item in data:
        # Долгая логика
        process_item(item)

# После рефакторинга
def process_data(data):
    for item in data:
        process_item(item)

def process_item(item):
    # Долгая логика
