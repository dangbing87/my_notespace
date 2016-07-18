#include <stdio.h>
#include <stdlib.h>

#define object_decorator(method, object) method(object)

struct object {
    void (*init)(void);
    void (*say)(struct object);

    int x;
};

void __init(void);
void __say(struct object instance);
struct object create_object(void);
void delete_object(struct object instance);


int main(void)
{
    struct object A = create_object();

    A.x = 1;

    object_decorator(A.say, A);
    delete_object(A);
    return 0;
}

void __init(void)
{
    printf("this is init\n");
}

void __say(struct object self)
{
    printf("%d\n", self.x);
}

struct object create_object(void)
{
    struct object new_object;
    new_object.init = __init;
    new_object.say = __say;

    new_object.init();
    return new_object;
}

void delete_object(struct object instance)
{
    printf("this object is deleted\n");
}
