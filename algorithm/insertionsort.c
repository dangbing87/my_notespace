#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <sys/time.h>

#define length(arr, type) (sizeof(arr) / sizeof(type))

const int ARRAY_LEN = 10000;

void insertion_sort(int *a, int len);
void swap(int *a, int *b);

int main(int *ac, char *av)
{
    int a[ARRAY_LEN];
    int timeuse, array_len;
    struct timeval start, end;

    array_len = length(a, int);

    srand((unsigned)time(NULL));

    for (int i=0; i<array_len; ++i) {
        a[i] = rand()%ARRAY_LEN;
    }

    for (int i=0; i<array_len; ++i) {
        printf("%d ", *(a+i));
    }
    printf("\n");

    gettimeofday( &start, NULL );
    insertion_sort(a, array_len);
    gettimeofday( &end, NULL );

    timeuse = 1000000 * ( end.tv_sec - start.tv_sec ) + end.tv_usec - start.tv_usec;

    for (int i=0; i<array_len; ++i) {
        printf("%d ", *(a+i));
    }
    printf("\n");

    printf("time: %d us\n", timeuse);

    return 0;
}

void insertion_sort(int *a, int len) {
    int i, j, tmp;

    for (i=1; i<len; ++i) {
        tmp = *(a+i);
        j = i - 1;

        while (j>=0 && a[j]>tmp) {
            *(a+j+1) = *(a+j);
            --j;
        }

        *(a+j+1) = tmp;
    }
    printf("\n");
}

void swap(int *a, int *b)
{
    int tmp;

    tmp = *a;
    *a = *b;
    *b = tmp;
}
