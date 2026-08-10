// Path: frontend/src/assets/images/paints/index.ts
// Central lookup so components never hardcode raw image paths.
// Backend stores images as "/images/paints/<Name>.png" — we take the
// filename (no extension) out of that string and match it here.

import AmberPremiumDampProofEmulsion from './AmberPremiumDampProofEmulsion.png';
import AzuritePremiumInteriorEmulsion from './AzuritePremiumInteriorEmulsion.png';
import CalciteEconomyTwoinOneEmulsion from './CalciteEconomyTwoinOneEmulsion.png';
import CitrineEconomyInteriorEmulsion from './CitrineEconomyInteriorEmulsion.png';
import ExteriorDampProofPrimer from './ExteriorDampProofPrimer.png';
import ExteriorWaterproofPrimer from './ExteriorWaterproofPrimer.png';
import FluoriteMediumExteriorEmulsion from './FluoriteMediumExteriorEmulsion.png';
import GarnetGlossyInteriorEmulsion from './GarnetGlossyInteriorEmulsion.png';
import HowliteSheenInteriorEmulsion from './HowliteSheenInteriorEmulsion.png';
import JadeRoofTileCoat from './JadeRoofTileCoat.png';
import OnyxSheenExteriorEmulsion from './OnyxSheenExteriorEmulsion.png';
import OpalPremiumExteriorEmulsion from './OpalPremiumExteriorEmulsion.png';
import PyriteTwoinOnePrimer from './PyriteTwoinOnePrimer.png';
import SunstoneHighGlossFoundationCoat from './SunstoneHighGlossFoundationCoat.png';
import blitzlogo from './blitzlogo.png';

const paintImages: Record<string, string> = {
    AmberPremiumDampProofEmulsion,
    AzuritePremiumInteriorEmulsion,
    CalciteEconomyTwoinOneEmulsion,
    CitrineEconomyInteriorEmulsion,
    ExteriorDampProofPrimer,
    ExteriorWaterproofPrimer,
    FluoriteMediumExteriorEmulsion,
    GarnetGlossyInteriorEmulsion,
    HowliteSheenInteriorEmulsion,
    JadeRoofTileCoat,
    OnyxSheenExteriorEmulsion,
    OpalPremiumExteriorEmulsion,
    PyriteTwoinOnePrimer,
    SunstoneHighGlossFoundationCoat,
};

/**
 * Resolves a product's stored image path (e.g. "/images/paints/JadeRoofTileCoat.png")
 * to the actual bundled asset. Falls back to the Blitz logo if no match is found.
 */
export function getPaintImage(imagePath?: string | null): string {
    if (!imagePath) return blitzlogo;
    const filename = imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? '';
    return paintImages[filename] ?? blitzlogo;
}