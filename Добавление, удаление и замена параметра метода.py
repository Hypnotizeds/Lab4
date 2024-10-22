# До рефакторинга
def save_user(name, email, age, is_active=True):
    # Логика

# После рефакторинга (группировка)
def save_user(user_data):
    # Логика
