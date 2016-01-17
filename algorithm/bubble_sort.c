#include <stdio.h>

#define length(arr, type) (sizeof(arr) / sizeof(type))

int main(int *ac, char *av[])
{
    int a[] = {2, 6, 1, 7, 3, 9, 3},
        max_length = length(a, int),
        tmp;

    for (int i=0; i<max_length; ++i) {
        for (int j=0; j<max_length; ++j) {
            if (*(a+i) < *(a+j)) {
                tmp = *(a+i);
                *(a+i) = *(a+j);
                *(a+j) = tmp;
            }
        }
    }

    for (int i=0; i<max_length; ++i) {
        printf("%d\t", *(a+i));
    }

    printf("\n");

    return 0;
}
