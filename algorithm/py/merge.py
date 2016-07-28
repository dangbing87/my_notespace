#!/usr/bin/env python
# -*-coding:utf-8-*-

import random
import datetime

def merge(a=[]):
    left = []
    right = []
    middle = len(a) / 2

    if len(a) <= 2:
        return a

    left = a[0:middle]
    right = a[middle:]

    left = merge(left)
    right = merge(right)

    return merge_sort(left, right)

def merge_sort(left, right):
    results = []

    while len(left)>0 and len(right)>0:
        if left[0] <= right[0]:
            results.append(left.pop(0))
        else:
            results.append(right.pop(0))

    if len(left) > 0:
        results.extend(left)
    else:
        results.extend(right)
    return results

if __name__ == "__main__":
    a = []
    [a.append(random.randint(1, 100000)) for i in xrange(100000)]

    start_time = datetime.datetime.now()
    b = merge(a)
    end_time = datetime.datetime.now()

    print (end_time - start_time)
