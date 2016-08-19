#!/usr/bin/env python
# -*-coding:utf-8-*-

import abc


class AbstractSubject(object):
    @abc.abstractmethod
    def register(self, listener):
        pass

    @abc.abstractmethod
    def deregister(self, listener):
        pass

    @abc.abstractmethod
    def notify_listeners(self, listener):
        pass


class Listener(object):
    def __init__(self, name, subject):
        self.name = name
        subject.register(self)

    def notify(self, event):
        print '{name} {event}'.format(name=self.name, event=event)


class Subject(AbstractSubject):
    def __init__(self):
        self.listeners = []

    def register(self, listener):
        self.listeners.append(listener)

    def deregister(self, listener):
        self.listeners.remove(listener)

    def set_event(self, listener_name, event):
        self.notify_listeners(listener_name, event)

    def notify_listeners(self, listener_name, event):
        for listener in self.listeners:
            if listener.name == listener_name:
                listener.notify(event)


if __name__ == '__main__':
    subject = Subject()

    listener_a = Listener('a', subject)
    listener_b = Listener('b', subject)

    subject.set_event('a', 'hello')
