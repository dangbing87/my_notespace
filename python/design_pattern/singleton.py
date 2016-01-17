#!/usr/bin/env python
# -＊-coding:utf-8-＊-


class Singleton(object):

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
        return cls._instance


class ShareData(object):
    """
    只共享数据，但每次new都会开辟内存空间
    """

    shared_state = {}

    def __init__(self):
        self.__dict__ = self.shared_state
