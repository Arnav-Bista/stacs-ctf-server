# Pen testing challenges

The pen testing challenges are all made using docker. Some helpful
scripts have been included to start them and get new terminals.

## Building

To build, simply run

```
make
```

### Packaging

To package for distribution, run

```
make package
```

This will create a zip of the necessary container images and the
starting scripts. The password for the zip is `infected`.

## FLags

The flags for each challenge is as follows

- Victim 1: 5269-5f9a3c2ca6ffda66c1e1b0f7a39887a8a43eabe8
- Victim 2: CVE-2011-2523-1f94e523be6e8ae3e24fb54aa40e56102d81f0d3
- Victim 3: www-data-648c662b4486c435a676fc6737245d105d1a5685

## Running

1. Download the zipped package.
2. Unzip using the password `infected`.
3. Open a terminal in the extracted directory
4. Run `./start.sh`

Should you need an additional terminal, open a new terminal in the
extracted directory and run `./new-shell.sh`.

DO NOT CLOSE THE TERMINAL RUNNING `./start.sh`!! THis will close the
challenges.
