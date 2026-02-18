#include <stdio.h>
#include "sidechannel.h"

int main() {
    struct vault * v = new_vault();
    auto s = open_vault(v, "abc");
    if (s) {
        printf("%s\n", s);
    }
}
