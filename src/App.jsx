import { ConfigProvider, Layout, Typography, Card, Row, Col, Statistic } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

// Настройка локали dayjs
dayjs.locale('ru');

// Пример данных для прототипа
const scoringData = [
  { id: 1, name: 'Подстанция "Северная"', score: 95, priority: 'Высокий', category: 'Трансформаторная подстанция' },
  { id: 2, name: 'ЛЭП-110кВ "Южная"', score: 87, priority: 'Высокий', category: 'Линия электропередачи' },
  { id: 3, name: 'Распределительный пункт №5', score: 72, priority: 'Средний', category: 'Распределительный пункт' },
  { id: 4, name: 'Трансформатор Т-154', score: 65, priority: 'Средний', category: 'Трансформатор' },
  { id: 5, name: 'Кабельная линия КЛ-10', score: 48, priority: 'Низкий', category: 'Кабельная линия' },
];

const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          background: '#fff', 
          display: 'flex', 
          alignItems: 'center',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            ⚡ Модуль приоритизации объектов электросети
          </Title>
        </Header>
        
        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card style={{ marginBottom: 24 }}>
            <Title level={4}>📊 О системе</Title>
            <Paragraph>
              Данный прототип демонстрирует систему оценки и приоритизации объектов электросетевого хозяйства 
              на основе множественных критериев. Система помогает определить очередность модернизации или 
              ремонта оборудования.
            </Paragraph>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="Объектов в базе" value={scoringData.length} />
              </Col>
              <Col span={6}>
                <Statistic title="Высокий приоритет" value={scoringData.filter(i => i.priority === 'Высокий').length} />
              </Col>
              <Col span={6}>
                <Statistic title="Средний приоритет" value={scoringData.filter(i => i.priority === 'Средний').length} />
              </Col>
              <Col span={6}>
                <Statistic title="Низкий приоритет" value={scoringData.filter(i => i.priority === 'Низкий').length} />
              </Col>
            </Row>
          </Card>

          <Title level={4}>📋 Список объектов с оценками</Title>
          <Row gutter={[16, 16]}>
            {scoringData.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card 
                  hoverable
                  title={item.name}
                  extra={
                    <span style={{ 
                      color: item.score >= 80 ? '#ff4d4f' : item.score >= 60 ? '#faad14' : '#52c41a',
                      fontWeight: 'bold'
                    }}>
                      {item.score} баллов
                    </span>
                  }
                >
                  <p><strong>Категория:</strong> {item.category}</p>
                  <p><strong>Приоритет:</strong> 
                    <span style={{ 
                      marginLeft: 8,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: item.priority === 'Высокий' ? '#fff1f0' : item.priority === 'Средний' ? '#fffbe6' : '#f6ffed',
                      color: item.priority === 'Высокий' ? '#ff4d4f' : item.priority === 'Средний' ? '#faad14' : '#52c41a',
                      border: `1px solid ${item.priority === 'Высокий' ? '#ffa39e' : item.priority === 'Средний' ? '#ffe58f' : '#b7eb8f'}`
                    }}>
                      {item.priority}
                    </span>
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
