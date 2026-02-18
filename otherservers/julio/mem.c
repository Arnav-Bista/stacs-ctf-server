#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <sys/mman.h>
#include <errno.h>
#include <stdbool.h>

#define STATUS_UNAUTHORIZED 1
#define STATUS_BAD_REQUEST 2
#define STATUS_INTERNAL_SERVER_ERROR 3

struct field {
    char * field;
    char * actual;
};

int fieldck(struct field f, char * guess) {
    // printf("fieldck %s %s %s\n", field, actual, guess);
    if (strncmp(f.field, guess, strlen(f.field))) {
        return -1;
    }

    if (strcmp(guess + strlen(f.field), f.actual)) {
        return 1;
    }

    return 0;
}

int main(int argn, char ** argv) {
    size_t page_size = sysconf(_SC_PAGESIZE);
    char * buf = (char *) aligned_alloc(page_size, page_size * 2);

    if (mprotect(buf + page_size, page_size, PROT_NONE) == -1 || errno) {
        perror("mprotect failed");
        return STATUS_INTERNAL_SERVER_ERROR;
    }


    size_t n = read(0, buf, page_size);
    if (errno) {
        perror("read failed");
        return STATUS_BAD_REQUEST;
    }

    printf("page size %zd\n", page_size);
    printf("read %zd\n", n);

    if (close(0)) {
        perror("close failed");
        return STATUS_BAD_REQUEST;
    }

    char * cur = buf;

    struct field fields[2] = {
        { .field = "username=", .actual = argv[1] },
        { .field = "password=", .actual = argv[2] },
    };

    int ok = 0;

    while (cur - buf < n) {
        int ok = 0;
        for (int i = 0; i < 2; i++) {
            // printf("checking value %s\n", fields[i].actual);

            switch (fieldck(fields[i], cur)) {
            case -1:
                // printf("bad field at %s\n", fields[i].field);
                continue;
            case 1:
                // NOTE: debug only this will segfailt all bad passwords
                // printf("unauth at %s %s\n", fields[i].field, cur);
                return STATUS_UNAUTHORIZED;
            case 0:
                ok++;
                break;
            }

            printf("correct %s\n", fields[i].field);
            break;
        }

        cur += strlen(cur) + 1;
    }

    return ok == 2 ? EXIT_SUCCESS : STATUS_UNAUTHORIZED;
}

