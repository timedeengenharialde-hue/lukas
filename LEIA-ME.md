# Monitor de Demandas

Widget flutuante para Windows + app Android. Os dados ficam em cada aparelho (sem sincronizar).

## Gerar os instaladores (GitHub, sem instalar nada no PC)
1. Crie um repositório **privado** em github.com (botão New).
2. Clique em "uploading an existing file" e arraste TODO o conteúdo desta pasta (inclusive a pasta `.github`).
3. Aba **Actions** → aguarde "Gerar instaladores" ficar verde (cerca de 10 min).
4. Abra a execução → em **Artifacts** baixe:
   - `monitor-windows-instalador` → rode o `.exe`
   - `monitor-android-apk` → copie o `app-debug.apk` para o celular e instale (permitir "fontes desconhecidas").

## Gerar no próprio PC (alternativa)
- Windows: instale Node.js 22, depois `npm install` e `npm run dist:win` (sai em `dist/`).
- Android: precisa de Android Studio + JDK 21: `npm install`, `npx cap add android`, `npx cap sync android`, `cd android`, `gradlew assembleDebug`.

## Uso
- Gato: clique para recolher/abrir. Arraste pelos três pontos acima dele.
- Ícone perto do relógio do Windows: mostrar/ocultar, iniciar com o Windows, sair.
- Cobrança: a cada X minutos sem atualização, dentro do horário configurado (padrão 08:00 às 18:00, seg a sex).
- Prazo: avisa 24 h antes, 1 h antes e quando vence.
