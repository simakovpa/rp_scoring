import { ConfigProvider, Layout, Typography, Card, Row, Col, Statistic, Modal, Tag, Progress, Descriptions, Table } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

// Настройка локали dayjs
dayjs.locale('ru');

// Расширенные данные для прототипа с подробностями расчета
const scoringData = [
  { 
    id: 1, 
    name: 'Подстанция "Северная"', 
    score: 95, 
    priority: 'Высокий', 
    category: 'Трансформаторная подстанция',
    details: {
      year: 1985,
      condition: 'Критическое',
      lastRepair: '2018-05-15',
      failures: 12,
      customers: 45000,
      criticalObjects: ['Больница №1', 'Школа №5', 'Жилой массив "Северный"'],
      calculation: [
        { criterion: 'Техническое состояние', weight: 30, score: 28, weighted: 26.6 },
        { criterion: 'Частота отказов', weight: 25, score: 22, weighted: 22.0 },
        { criterion: 'Количество потребителей', weight: 20, score: 18, weighted: 18.0 },
        { criterion: 'Наличие критических объектов', weight: 15, score: 14, weighted: 14.0 },
        { criterion: 'Возраст оборудования', weight: 10, score: 9, weighted: 9.0 },
      ],
      totalWeight: 100,
      recommendation: 'Немедленная модернизация или замена оборудования'
    }
  },
  { 
    id: 2, 
    name: 'ЛЭП-110кВ "Южная"', 
    score: 87, 
    priority: 'Высокий', 
    category: 'Линия электропередачи',
    details: {
      year: 1990,
      condition: 'Удовлетворительное',
      lastRepair: '2020-08-22',
      failures: 8,
      customers: 32000,
      criticalObjects: ['Промышленная зона "Юг"', 'Торговый центр'],
      calculation: [
        { criterion: 'Техническое состояние', weight: 30, score: 25, weighted: 25.0 },
        { criterion: 'Частота отказов', weight: 25, score: 20, weighted: 20.0 },
        { criterion: 'Количество потребителей', weight: 20, score: 16, weighted: 16.0 },
        { criterion: 'Наличие критических объектов', weight: 15, score: 13, weighted: 13.0 },
        { criterion: 'Возраст оборудования', weight: 10, score: 8, weighted: 8.0 },
      ],
      totalWeight: 100,
      recommendation: 'Плановый капитальный ремонт в течение 6 месяцев'
    }
  },
  { 
    id: 3, 
    name: 'Распределительный пункт №5', 
    score: 72, 
    priority: 'Средний', 
    category: 'Распределительный пункт',
    details: {
      year: 2001,
      condition: 'Хорошее',
      lastRepair: '2022-03-10',
      failures: 4,
      customers: 18000,
      criticalObjects: ['Административное здание'],
      calculation: [
        { criterion: 'Техническое состояние', weight: 30, score: 22, weighted: 22.0 },
        { criterion: 'Частота отказов', weight: 25, score: 18, weighted: 18.0 },
        { criterion: 'Количество потребителей', weight: 20, score: 12, weighted: 12.0 },
        { criterion: 'Наличие критических объектов', weight: 15, score: 10, weighted: 10.0 },
        { criterion: 'Возраст оборудования', weight: 10, score: 7, weighted: 7.0 },
      ],
      totalWeight: 100,
      recommendation: 'Плановое техническое обслуживание в текущем году'
    }
  },
  { 
    id: 4, 
    name: 'Трансформатор Т-154', 
    score: 65, 
    priority: 'Средний', 
    category: 'Трансформатор',
    details: {
      year: 1998,
      condition: 'Хорошее',
      lastRepair: '2021-11-05',
      failures: 3,
      customers: 12000,
      criticalObjects: [],
      calculation: [
        { criterion: 'Техническое состояние', weight: 30, score: 20, weighted: 20.0 },
        { criterion: 'Частота отказов', weight: 25, score: 16, weighted: 16.0 },
        { criterion: 'Количество потребителей', weight: 20, score: 10, weighted: 10.0 },
        { criterion: 'Наличие критических объектов', weight: 15, score: 5, weighted: 5.0 },
        { criterion: 'Возраст оборудования', weight: 10, score: 9, weighted: 9.0 },
      ],
      totalWeight: 100,
      recommendation: 'Мониторинг состояния, плановая диагностика'
    }
  },
  { 
    id: 5, 
    name: 'Кабельная линия КЛ-10', 
    score: 48, 
    priority: 'Низкий', 
    category: 'Кабельная линия',
    details: {
      year: 2010,
      condition: 'Отличное',
      lastRepair: '2023-06-18',
      failures: 1,
      customers: 5000,
      criticalObjects: [],
      calculation: [
        { criterion: 'Техническое состояние', weight: 30, score: 15, weighted: 15.0 },
        { criterion: 'Частота отказов', weight: 25, score: 10, weighted: 10.0 },
        { criterion: 'Количество потребителей', weight: 20, score: 8, weighted: 8.0 },
        { criterion: 'Наличие критических объектов', weight: 15, score: 0, weighted: 0.0 },
        { criterion: 'Возраст оборудования', weight: 10, score: 10, weighted: 10.0 },
      ],
      totalWeight: 100,
      recommendation: 'Текущее обслуживание по графику'
    }
  },
];

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Высокий': return '#ff4d4f';
      case 'Средний': return '#faad14';
      case 'Низкий': return '#52c41a';
      default: return '#8c8c8c';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#ff4d4f';
    if (score >= 60) return '#faad14';
    return '#52c41a';
  };

  const columns = [
    { title: 'Критерий', dataIndex: 'criterion', key: 'criterion' },
    { title: 'Вес, %', dataIndex: 'weight', key: 'weight', align: 'center' },
    { title: 'Балл', dataIndex: 'score', key: 'score', align: 'center' },
    { 
      title: 'Взвешенный балл', 
      dataIndex: 'weighted', 
      key: 'weighted', 
      align: 'right',
      render: (value) => <strong>{value.toFixed(1)}</strong>
    },
  ];
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
                      color: getScoreColor(item.score),
                      fontWeight: 'bold'
                    }}>
                      {item.score} баллов
                    </span>
                  }
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <p><strong>Категория:</strong> {item.category}</p>
                  <p><strong>Приоритет:</strong> 
                    <Tag color={getPriorityColor(item.priority)}>{item.priority}</Tag>
                  </p>
                  <p style={{ fontSize: 12, color: '#999' }}>Нажмите для просмотра деталей расчета</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>

        {/* Модальное окно с подробностями расчета */}
        <Modal
          title={
            <div>
              <Title level={4} style={{ margin: 0 }}>{selectedItem?.name}</Title>
              <Tag color={getPriorityColor(selectedItem?.priority)}>{selectedItem?.priority} приоритет</Tag>
            </div>
          }
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          {selectedItem && (
            <>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: 24 }}>
                <Descriptions.Item label="Категория">{selectedItem.category}</Descriptions.Item>
                <Descriptions.Item label="Год ввода">{selectedItem.details.year}</Descriptions.Item>
                <Descriptions.Item label="Состояние">{selectedItem.details.condition}</Descriptions.Item>
                <Descriptions.Item label="Последний ремонт">{dayjs(selectedItem.details.lastRepair).format('DD.MM.YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Отказы (за год)">{selectedItem.details.failures}</Descriptions.Item>
                <Descriptions.Item label="Потребителей">{selectedItem.details.customers.toLocaleString()}</Descriptions.Item>
              </Descriptions>

              <Title level={5}>🔢 Детали расчета итогового балла</Title>
              <Table 
                columns={columns}
                dataSource={selectedItem.details.calculation}
                rowKey="criterion"
                pagination={false}
                size="small"
                footer={() => (
                  <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    Итого: {selectedItem.details.calculation.reduce((sum, item) => sum + item.weighted, 0).toFixed(1)} / 100
                  </div>
                )}
              />

              <div style={{ marginTop: 24 }}>
                <Title level={5}>📈 Визуализация вклада критериев</Title>
                {selectedItem.details.calculation.map((item) => (
                  <div key={item.criterion} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span>{item.criterion}</span>
                      <span>{item.weighted.toFixed(1)} из {item.weight}</span>
                    </div>
                    <Progress 
                      percent={(item.weighted / item.weight) * 100} 
                      strokeColor={getScoreColor(item.weighted)}
                      size="small"
                    />
                  </div>
                ))}
              </div>

              {selectedItem.details.criticalObjects.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Title level={5}>⚠️ Критические объекты</Title>
                  <ul>
                    {selectedItem.details.criticalObjects.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Card 
                type="inner" 
                style={{ marginTop: 24, background: '#f6ffed', borderColor: '#b7eb8f' }}
              >
                <Title level={5}>💡 Рекомендация</Title>
                <Paragraph style={{ margin: 0, fontSize: 14 }}>
                  {selectedItem.details.recommendation}
                </Paragraph>
              </Card>
            </>
          )}
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
