import { Command } from 'commander';
import { generateQRCode } from './qr';

const program = new Command();

program
  .name('qr-cli')
  .description('Генератор QR-кодов для терминала')
  .version('1.0.0');

program
  .command('generate <text>')
  .description('Генерирует QR-код из текста или ссылки')
  .option('--size <number>', 'размер матрицы QR-кода (минимальный 21)', (value) => parseInt(value, 10))
  .action(async (text: string, options: { size?: number }) => {
    try {
      const qrAscii = await generateQRCode(text, options.size);
      console.log(qrAscii);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Ошибка: ${error.message}`);
      } else {
        console.error('Ошибка: Неизвестная ошибка при генерации QR-кода');
      }
      process.exit(1);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.error('Ошибка: Укажите текст или ссылку');
  program.help();
  process.exit(1);
}