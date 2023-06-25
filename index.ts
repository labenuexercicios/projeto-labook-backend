import './src/utils/database'; // Importe o arquivo de configuração do banco de dados, se necessário
import './src/models/Post';
import './src/models/User'; // Importe os modelos, se necessário
import { app } from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
