#!/usr/bin/env python
# -*-coding:utf-8-*-


def my_decorator(func):
    def wrap(*args, **kwargs):
        print 'this is decorator'
        func(*args, **kwargs)
    return wrap


def complex_decorator(word):
    def decorator(func):
        def wrap(*args, **kwargs):
            print word
            func(*args, **kwargs)
        return wrap
    return decorator


@my_decorator
def say_hi(word):
    print 'hello {0}'.format(word)


@complex_decorator('hi, guys')
def say_guys(word):
    print 'hello {0}'.format(word)


if __name__ == '__main__':
    say_hi('world')
    say_guys('world')
