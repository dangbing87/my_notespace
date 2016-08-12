#!/usr/bin/env python
# -*-coding:utf-8-*-


class AbstractSubject(object):
    def register(self, listener):
        raise NotImplementedError("Must subclass me")

    def deregister(self, listener):
        raise NotImplementedError("Must subclass me")

    def notify_listeners(self, event):
        raise NotImplementedError("Must subclass me")


class Listener(object):
    def __init__(self, name, subject):
        self.name = name
        subject.register(self)

    def notify(self, event):
        print self.name, "received event", event


class Subject(AbstractSubject):
    def __init__(self):
        self.listeners = []
        self.data = None

    def getUserAction(self):
        self.data = raw_input('Enter something to do:')
        return self.data

    # Implement abstract Class AbstractSubject

    def register(self, listener):
        self.listeners.append(listener)

    def deregister(self, listener):
        self.listeners.remove(listener)

    def notify_listeners(self, event):
        for listener in self.listeners:
            listener.notify(event)


if __name__=="__main__":
    subject = Subject()

    listenerA = Listener("<listener A>", subject)
    listenerB = Listener("<listener B>", subject)

    subject.notify_listeners("<event 1>")

    action = subject.getUserAction()
    subject.notify_listeners(action)
