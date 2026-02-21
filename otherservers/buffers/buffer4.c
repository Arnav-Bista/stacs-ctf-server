#include <stdio.h>
void win() {
  printf("flag_{r3turn_0riented_pr0gramming_g0es_brrr}");
}

int vul() {
  char buffer[100];
  printf("Enter your name: ");
  fgets(buffer, 0x100, stdin);
  return 0;
}

int main() {
  vul();
  return 0;
}
