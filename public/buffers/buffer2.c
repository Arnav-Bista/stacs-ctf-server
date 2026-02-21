#include <stdio.h>
#include <string.h>

int main() {
  printf("I've upgraded my survey! Completely uncrackable this time.\n");
  printf("Important question: is water wet? (yes/no)\n");

  int hackerman = 0;
  char buffer[100];
  // Haha! Im using fgets to prevent buffer overflow!
  fgets(buffer, 0x100, stdin);
  printf("%d\n", hackerman);

  if (strcmp(buffer, "yes") == 0) {
    printf("Debatable, but I respect it.\n");
  } else {
    printf("Bold claim. I hope you can back it up.\n");
  }

  if (hackerman == 0x216E6977) {
    printf("No... that's impossible. You changed my memory?!\n");
    printf("Here is your flag: XXXXXXXXXXXXXXXXXXXXXXXXXXXX\n");
  }
}
