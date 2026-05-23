import * as QRCode from 'qrcode';

export async function generateQRCode(text: string, size?: number): Promise<string> {
    let minVersion = 1;
    for (let v = 1; v <= 40; v++) {
        try {
            await QRCode.toString(text, { version: v, type: 'terminal' });
            minVersion = v;
            break;
        } catch (e) {
            continue;
        }
    }

    let targetVersion = minVersion;
    if (size !== undefined) {
        let requestedVersion = Math.max(1, Math.floor((size - 21) / 4) + 1);
        requestedVersion = Math.min(40, requestedVersion);
        targetVersion = Math.max(minVersion, requestedVersion);
    }

    return await QRCode.toString(text, {
        type: 'terminal',
        errorCorrectionLevel: 'M',
        version: targetVersion,
    });
}