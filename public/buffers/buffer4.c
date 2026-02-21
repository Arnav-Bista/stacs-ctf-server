#include <stdio.h>
void win() {
  printf("XXXXXXXXXXXXXXXXXXXXXXXXXXXX");
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
