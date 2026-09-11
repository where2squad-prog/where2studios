Static instances used by scripts/og-images.ts.

Google Fonts only ships Fredoka and Inter as variable fonts, so these were cut
from the variable sources with fontTools:

  curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/Fredoka%5Bwdth%2Cwght%5D.ttf" -o Fredoka.ttf
  curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf" -o Inter.ttf
  python3 -m fontTools.varLib.instancer Fredoka.ttf wght=600 wdth=100 -o Fredoka-SemiBold.ttf
  python3 -m fontTools.varLib.instancer Inter.ttf wght=500 opsz=28 -o Inter-Medium.ttf
  rm Fredoka.ttf Inter.ttf

Keep only the instanced files here: the renderer matches fonts by family name and
the variable sources claim the same names.
