import numpy as np
import wave
import matplotlib.pyplot as plt
from PIL import Image, ImageOps


# flag_{list3n-t0-my-radio-sh0w}

img = np.rot90((np.array(
    ImageOps.grayscale(Image.open("flag.png"))
) < 0.1).astype(np.int16), k=-1)
print(img.shape)

# img.show()
"""
wav = wave.open("wheel-up-signal.wav")
audio = np.frombuffer(
    wav.readframes(wav.getnframes()),
    dtype=np.int16,
).astype(np.float32)
"""

# samples = [ np.fft.irfft(row, 354) for row in img ]
# print(len(samples[0]))
# print(sum(len(sample) for sample in samples))

out = wave.open("flag.wav", "w")
out.setnchannels(1)
out.setsampwidth(2)
out.setframerate(44100)

for sample in (np.fft.irfft(np.roll(row, 50) * 0xfff) for row in img):
    out.writeframesraw((sample).astype(np.int16))

out.writeframes(''.encode())
out.close()

# plt.imshow(img, cmap="gray")
# plt.show()
# Image.fromarray(freqs, "RGB").show()
