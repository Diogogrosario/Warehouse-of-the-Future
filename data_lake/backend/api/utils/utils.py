import random
import datetime


X_MIN, Y_MIN, Z_MIN = 0, 0, 0
X_MAX, Y_MAX, Z_MAX = 100, 100, 100


def get_position(dimensions=3):
    coordinates = [
        random.randint(X_MIN, X_MAX),
        random.randint(Y_MIN, Y_MAX),
    ]

    if dimensions == 3:
        coordinates.append(random.randint(Z_MIN, Z_MAX))

    return coordinates


def get_random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)

    return start + datetime.timedelta(seconds=random_second)


def get_random_date_last_day():
    now = datetime.datetime.now()
    yesterday = now - datetime.timedelta(days=1)

    return get_random_date(yesterday, now)


def get_random_birth_date():
    now = datetime.datetime.now()
    eighteen_years_ago = now - datetime.timedelta(days=18*365)
    sixty_five_years_ago = now - datetime.timedelta(days=65*365)

    return get_random_date(sixty_five_years_ago, eighteen_years_ago)
