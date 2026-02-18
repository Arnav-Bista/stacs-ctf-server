import resource
x = "username=admin\0password=a"
print("\0" * (resource.getpagesize() - len(x)) + x, end="")
# print(x, end="")
