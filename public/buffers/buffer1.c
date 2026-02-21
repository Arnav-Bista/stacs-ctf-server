#include <stdio.h>
#include <string.h>

int main() {
  printf("Welcome to the most secure survey in Scotland!\n");
  printf("Is a hotdog a sandwich? (yes/no)\n");

  int hackerman = 0;
  char buffer[100];
  // Haha! Im using fgets to prevent buffer overflow!
  fgets(buffer, 0x100, stdin);
  printf("%d\n", hackerman);

  if (strcmp(buffer, "yes") == 0) {
    printf("Bold choice. The philosophers will hear of this.\n");
  } else {
    printf("Coward. But fair enough.\n");
  }

  if (hackerman) {
    printf("Wait... how did you do that?!\n");
    printf("Here is your flag: XXXXXXXXXXXXXXXXXXXXXXXXXXXX\n");
  }
}
