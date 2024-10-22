# До рефакторинга
def calculate_total(price, tax):
    return price + (price * tax)

def display_total(price, tax):
    total = calculate_total(price, tax)
    print(f'Total: {total}')

# После рефакторинга
def display_total(price, tax):
    total = price + (price * tax)
    print(f'Total: {total}')
