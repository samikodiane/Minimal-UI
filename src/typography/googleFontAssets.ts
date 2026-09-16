import { Abel_400Regular } from '@expo-google-fonts/abel/400Regular';
import { Acme_400Regular } from '@expo-google-fonts/acme/400Regular';
import { AmaticSC_400Regular } from '@expo-google-fonts/amatic-sc/400Regular';
import { AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc/700Bold';
import { Audiowide_400Regular } from '@expo-google-fonts/audiowide/400Regular';
import { Bangers_400Regular } from '@expo-google-fonts/bangers/400Regular';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue/400Regular';
import { Bungee_400Regular } from '@expo-google-fonts/bungee/400Regular';
import { Caveat_400Regular } from '@expo-google-fonts/caveat/400Regular';
import { Caveat_600SemiBold } from '@expo-google-fonts/caveat/600SemiBold';
import { Caveat_700Bold } from '@expo-google-fonts/caveat/700Bold';
import { Changa_400Regular } from '@expo-google-fonts/changa/400Regular';
import { Changa_600SemiBold } from '@expo-google-fonts/changa/600SemiBold';
import { Changa_700Bold } from '@expo-google-fonts/changa/700Bold';
import { Cinzel_400Regular } from '@expo-google-fonts/cinzel/400Regular';
import { Cinzel_600SemiBold } from '@expo-google-fonts/cinzel/600SemiBold';
import { Cinzel_700Bold } from '@expo-google-fonts/cinzel/700Bold';
import { Courgette_400Regular } from '@expo-google-fonts/courgette/400Regular';
import { Goldman_400Regular } from '@expo-google-fonts/goldman/400Regular';
import { Goldman_700Bold } from '@expo-google-fonts/goldman/700Bold';
import { Gruppo_400Regular } from '@expo-google-fonts/gruppo/400Regular';
import { Iceland_400Regular } from '@expo-google-fonts/iceland/400Regular';
import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif/400Regular';
import { JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans/400Regular';
import { JosefinSans_600SemiBold } from '@expo-google-fonts/josefin-sans/600SemiBold';
import { JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans/700Bold';
import { Kalam_400Regular } from '@expo-google-fonts/kalam/400Regular';
import { Kalam_700Bold } from '@expo-google-fonts/kalam/700Bold';
import { LexendExa_400Regular } from '@expo-google-fonts/lexend-exa/400Regular';
import { LexendExa_600SemiBold } from '@expo-google-fonts/lexend-exa/600SemiBold';
import { LexendExa_700Bold } from '@expo-google-fonts/lexend-exa/700Bold';
import { Lora_400Regular } from '@expo-google-fonts/lora/400Regular';
import { Lora_600SemiBold } from '@expo-google-fonts/lora/600SemiBold';
import { Lora_700Bold } from '@expo-google-fonts/lora/700Bold';
import { Outfit_400Regular } from '@expo-google-fonts/outfit/400Regular';
import { Outfit_600SemiBold } from '@expo-google-fonts/outfit/600SemiBold';
import { Outfit_700Bold } from '@expo-google-fonts/outfit/700Bold';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico/400Regular';
import { PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans/400Regular';
import { PixelifySans_600SemiBold } from '@expo-google-fonts/pixelify-sans/600SemiBold';
import { PixelifySans_700Bold } from '@expo-google-fonts/pixelify-sans/700Bold';
import { PoiretOne_400Regular } from '@expo-google-fonts/poiret-one/400Regular';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono/400Regular';
import { RobotoMono_600SemiBold } from '@expo-google-fonts/roboto-mono/600SemiBold';
import { RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono/700Bold';
import { Sail_400Regular } from '@expo-google-fonts/sail/400Regular';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono/400Regular';
import { SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro/400Regular';
import { SourceCodePro_600SemiBold } from '@expo-google-fonts/source-code-pro/600SemiBold';
import { SourceCodePro_700Bold } from '@expo-google-fonts/source-code-pro/700Bold';
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu/400Regular';
import { Ubuntu_500Medium } from '@expo-google-fonts/ubuntu/500Medium';
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu/700Bold';

import { ThemeFont } from './fontTypes';

export type GoogleFontFaces = {
  regular: number;
  semiBold: number;
  bold: number;
};

/**
 * Bundled Google Font faces (via @expo-google-fonts).
 * Imports use weight subpaths so unused faces stay out of the bundle.
 * Missing weights reuse the closest available file.
 */
export const GOOGLE_FONT_ASSETS: Record<
  Exclude<ThemeFont, ThemeFont.Geist>,
  GoogleFontFaces
> = {
  [ThemeFont.Poppins]: {
    regular: Poppins_400Regular,
    semiBold: Poppins_600SemiBold,
    bold: Poppins_700Bold,
  },
  [ThemeFont.PixelifySans]: {
    regular: PixelifySans_400Regular,
    semiBold: PixelifySans_600SemiBold,
    bold: PixelifySans_700Bold,
  },
  [ThemeFont.Cinzel]: {
    regular: Cinzel_400Regular,
    semiBold: Cinzel_600SemiBold,
    bold: Cinzel_700Bold,
  },
  [ThemeFont.Iceland]: {
    regular: Iceland_400Regular,
    semiBold: Iceland_400Regular,
    bold: Iceland_400Regular,
  },
  [ThemeFont.Abel]: {
    regular: Abel_400Regular,
    semiBold: Abel_400Regular,
    bold: Abel_400Regular,
  },
  [ThemeFont.Sail]: {
    regular: Sail_400Regular,
    semiBold: Sail_400Regular,
    bold: Sail_400Regular,
  },
  [ThemeFont.PoiretOne]: {
    regular: PoiretOne_400Regular,
    semiBold: PoiretOne_400Regular,
    bold: PoiretOne_400Regular,
  },
  [ThemeFont.RobotoMono]: {
    regular: RobotoMono_400Regular,
    semiBold: RobotoMono_600SemiBold,
    bold: RobotoMono_700Bold,
  },
  [ThemeFont.Lora]: {
    regular: Lora_400Regular,
    semiBold: Lora_600SemiBold,
    bold: Lora_700Bold,
  },
  [ThemeFont.Ubuntu]: {
    regular: Ubuntu_400Regular,
    semiBold: Ubuntu_500Medium,
    bold: Ubuntu_700Bold,
  },
  [ThemeFont.Outfit]: {
    regular: Outfit_400Regular,
    semiBold: Outfit_600SemiBold,
    bold: Outfit_700Bold,
  },
  [ThemeFont.BebasNeue]: {
    regular: BebasNeue_400Regular,
    semiBold: BebasNeue_400Regular,
    bold: BebasNeue_400Regular,
  },
  [ThemeFont.SourceCodePro]: {
    regular: SourceCodePro_400Regular,
    semiBold: SourceCodePro_600SemiBold,
    bold: SourceCodePro_700Bold,
  },
  [ThemeFont.JosefinSans]: {
    regular: JosefinSans_400Regular,
    semiBold: JosefinSans_600SemiBold,
    bold: JosefinSans_700Bold,
  },
  [ThemeFont.InstrumentSerif]: {
    regular: InstrumentSerif_400Regular,
    semiBold: InstrumentSerif_400Regular,
    bold: InstrumentSerif_400Regular,
  },
  [ThemeFont.Caveat]: {
    regular: Caveat_400Regular,
    semiBold: Caveat_600SemiBold,
    bold: Caveat_700Bold,
  },
  [ThemeFont.Bungee]: {
    regular: Bungee_400Regular,
    semiBold: Bungee_400Regular,
    bold: Bungee_400Regular,
  },
  [ThemeFont.Pacifico]: {
    regular: Pacifico_400Regular,
    semiBold: Pacifico_400Regular,
    bold: Pacifico_400Regular,
  },
  [ThemeFont.Kalam]: {
    regular: Kalam_400Regular,
    semiBold: Kalam_400Regular,
    bold: Kalam_700Bold,
  },
  [ThemeFont.AmaticSc]: {
    regular: AmaticSC_400Regular,
    semiBold: AmaticSC_400Regular,
    bold: AmaticSC_700Bold,
  },
  [ThemeFont.Acme]: {
    regular: Acme_400Regular,
    semiBold: Acme_400Regular,
    bold: Acme_400Regular,
  },
  [ThemeFont.ShareTechMono]: {
    regular: ShareTechMono_400Regular,
    semiBold: ShareTechMono_400Regular,
    bold: ShareTechMono_400Regular,
  },
  [ThemeFont.Bangers]: {
    regular: Bangers_400Regular,
    semiBold: Bangers_400Regular,
    bold: Bangers_400Regular,
  },
  [ThemeFont.LexendExa]: {
    regular: LexendExa_400Regular,
    semiBold: LexendExa_600SemiBold,
    bold: LexendExa_700Bold,
  },
  [ThemeFont.Courgette]: {
    regular: Courgette_400Regular,
    semiBold: Courgette_400Regular,
    bold: Courgette_400Regular,
  },
  [ThemeFont.Changa]: {
    regular: Changa_400Regular,
    semiBold: Changa_600SemiBold,
    bold: Changa_700Bold,
  },
  [ThemeFont.Gruppo]: {
    regular: Gruppo_400Regular,
    semiBold: Gruppo_400Regular,
    bold: Gruppo_400Regular,
  },
  [ThemeFont.Goldman]: {
    regular: Goldman_400Regular,
    semiBold: Goldman_400Regular,
    bold: Goldman_700Bold,
  },
  [ThemeFont.Audiowide]: {
    regular: Audiowide_400Regular,
    semiBold: Audiowide_400Regular,
    bold: Audiowide_400Regular,
  },
};
