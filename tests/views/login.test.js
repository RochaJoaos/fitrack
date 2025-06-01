const ejs = require('ejs');
const path = require('path');

describe('View: login.ejs', () => {
  it('deve conter o formulário de login', async () => {
    const filePath = path.join(__dirname, '../../views/login/login.ejs');

    const html = await ejs.renderFile(filePath, { title: 'Entrar - FitTrack' });

    expect(html).toContain('<form');
    expect(html).toContain('type="email"');
    expect(html).toContain('type="password"');
    expect(html).toContain('Entrar');
  });
});
