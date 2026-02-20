import numpy as np
import wave

def open_wav(f):
    wav = wave.open(f)
    chan = wav.getnchannels()
    return np.reshape(
        np.frombuffer(
            wav.readframes(wav.getnframes()),
            dtype=np.int16,
        ),
        (-1, chan) if chan > 1 else -1,
    )

wus = open_wav("wheel-up-signal.wav")
# to mono
wus = np.array(wus[:,0]) # np.mean(wus, axis=1)


flag = open_wav("flag.wav")

print(wus.shape)
print(flag.shape)

summed = np.concat((
    flag[:wus.shape[0]] + wus,
    flag[wus.shape[0]:],
))

out = wave.open("flag-summed.wav", "w")
out.setnchannels(1)
out.setsampwidth(2)
out.setframerate(44100)
out.writeframesraw(summed)
out.writeframes(''.encode())
out.close()
