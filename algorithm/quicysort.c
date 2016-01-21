#include <stdio.h>

#define length(arr, type) (sizeof(arr) / sizeof(type))

void quicksort(int *a, int left, int right);
void swap(int *a, int *b);

int main(int *ac, char **av)
{
    int a[] = {7, 5, 4, 6, 2, 0, 9};

    for (int i=0; i<7; i++) {
        printf("%d ", *(a+i));
    }
    printf("\n");

    quicksort(a, 0, 6);


    for (int i=0; i<7; i++) {
        printf("%d ", *(a+i));
    }
    printf("\n");

    return 0;
}


void quicksort(int *a, int left, int right)
{
    int i = left,
        j = right,
        key = *(a+left);

    if (left >= right) {
        return;
    }

    while (i<j && key<=*(a+j)) {
        j--;
    }

    swap(a+i, a+j);

    while(i<j && key>=*(a+i)) {
        i++;
    }

    swap(a+i, a+j);

    quicksort(a, left, --j);
    quicksort(a, ++i, right);
}

void swap(int *a, int *b)
{
    int tmp;

    tmp = *a;
    *a = *b;
    *b = tmp;
}
