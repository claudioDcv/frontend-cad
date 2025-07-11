import { Notification } from '@/entities/Notification.entity';

export const mockNotifications: Notification[] = [
  {
    timestamp: 1720684065000, // 10 de julio de 2024, 23:27:45 GMT-0300
    type: 'new-resolution',
    message: 'Tienes 5 nuevas resoluciones pendientes de revisión.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 1,
    entity: 'resolution',
    entityId: 0, // Cuando es un conteo general, entityId puede ser 0 o null
  },
  {
    timestamp: 1720684125000, // 10 de julio de 2024, 23:28:45 GMT-0300
    type: 'new-resolution',
    message:
      'La resolución #1234 ha sido creada y está lista para tu aprobación.',
    userName: 'María López',
    userId: 201,
    notificationId: 2,
    entity: 'resolution',
    entityId: 1234,
  },
  {
    timestamp: 1720684185000, // 10 de julio de 2024, 23:29:45 GMT-0300
    type: 'cancel-cpc',
    message:
      'Se han cancelado 2 CPC (Certificados de Posesión Conjunta) recientemente.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 3,
    entity: 'cpc',
    entityId: 0,
  },
  {
    timestamp: 1720684245000, // 10 de julio de 2024, 23:30:45 GMT-0300
    type: 'new-any',
    message:
      'Han llegado 3 nuevas solicitudes en tu bandeja de entrada general.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 4,
    entity: 'general_request',
    entityId: 0,
  },
  {
    timestamp: 1720684305000, // 10 de julio de 2024, 23:31:45 GMT-0300
    type: 'new-resolution',
    message: 'La resolución #1235 requiere tu firma digital.',
    userName: 'Pedro García',
    userId: 202,
    notificationId: 5,
    entity: 'resolution',
    entityId: 1235,
  },
  {
    timestamp: 1720684365000, // 10 de julio de 2024, 23:32:45 GMT-0300
    type: 'new-resolution',
    message: 'Se ha modificado la resolución #1230. Revisa los cambios.',
    userName: 'Ana Fernández',
    userId: 203,
    notificationId: 6,
    entity: 'resolution',
    entityId: 1230,
  },
  {
    timestamp: 1720684425000, // 10 de julio de 2024, 23:33:45 GMT-0300
    type: 'new-cpc',
    message:
      '¡Excelente! Has aprobado un nuevo CPC exitosamente. Ya puedes consultar el historial de CPCs.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 7,
    entity: 'cpc',
    entityId: 0, // Aunque el contador sea 0, si se aprueba individualmente, puede haber una notificación.
  },
  {
    timestamp: 1720684485000, // 10 de julio de 2024, 23:34:45 GMT-0300
    type: 'cancel-cpc',
    message: 'El CPC #7890 ha sido cancelado por falta de documentación.',
    userName: 'Juan Pérez',
    userId: 204,
    notificationId: 8,
    entity: 'cpc',
    entityId: 7890,
  },
  {
    timestamp: 1720684545000, // 10 de julio de 2024, 23:35:45 GMT-0300
    type: 'new-any',
    message:
      'Tienes una nueva solicitud de información de un usuario (ID: 345).',
    userName: 'Carlos Ruiz',
    userId: 205,
    notificationId: 9,
    entity: 'user_request',
    entityId: 345,
  },
  {
    timestamp: 1720684605000, // 10 de julio de 2024, 23:36:45 GMT-0300
    type: 'new-resolution',
    message: 'Una nueva resolución ha sido asignada a tu equipo para revisión.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 10,
    entity: 'resolution',
    entityId: 1236,
  },
  {
    timestamp: 1720684665000, // 10 de julio de 2024, 23:37:45 GMT-0300
    type: 'new-resolution',
    message:
      'La resolución #1237 está a punto de vencer. Por favor, revísala pronto.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 11,
    entity: 'resolution',
    entityId: 1237,
  },
  {
    timestamp: 1720684725000, // 10 de julio de 2024, 23:38:45 GMT-0300
    type: 'new-cpc',
    message: 'El CPC #7891 ha sido aprobado y enviado para registro.',
    userName: 'Laura Giménez',
    userId: 206,
    notificationId: 12,
    entity: 'cpc',
    entityId: 7891,
  },
  {
    timestamp: 1720684785000, // 10 de julio de 2024, 23:39:45 GMT-0300
    type: 'cancel-cpc',
    message: 'El CPC #7892 fue rechazado por errores en el formulario.',
    userName: 'Roberto Soto',
    userId: 207,
    notificationId: 13,
    entity: 'cpc',
    entityId: 7892,
  },
  {
    timestamp: 1720684845000, // 10 de julio de 2024, 23:40:45 GMT-0300
    type: 'new-any',
    message: 'Tienes un nuevo mensaje en el centro de soporte.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 14,
    entity: 'support_message',
    entityId: 0,
  },
  {
    timestamp: 1720684905000, // 10 de julio de 2024, 23:41:45 GMT-0300
    type: 'new-resolution',
    message: 'La resolución #1238 ha sido archivada con éxito.',
    userName: 'Silvia Díaz',
    userId: 208,
    notificationId: 15,
    entity: 'resolution',
    entityId: 1238,
  },
  {
    timestamp: 1720684965000, // 10 de julio de 2024, 23:42:45 GMT-0300
    type: 'new-resolution',
    message: 'Necesitas revisar los comentarios en la resolución #1239.',
    userName: 'Martín Castro',
    userId: 209,
    notificationId: 16,
    entity: 'resolution',
    entityId: 1239,
  },
  {
    timestamp: 1720685025000, // 10 de julio de 2024, 23:43:45 GMT-0300
    type: 'new-cpc',
    message: 'Se ha solicitado un nuevo CPC con el número #7893.',
    userName: 'Elena Vargas',
    userId: 210,
    notificationId: 17,
    entity: 'cpc',
    entityId: 7893,
  },
  {
    timestamp: 1720685085000, // 10 de julio de 2024, 23:44:45 GMT-0300
    type: 'cancel-cpc',
    message: 'El proceso de cancelación del CPC #7894 ha iniciado.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 18,
    entity: 'cpc',
    entityId: 7894,
  },
  {
    timestamp: 1720685145000, // 10 de julio de 2024, 23:45:45 GMT-0300
    type: 'new-any',
    message: 'Hay una actualización importante sobre tu caso #5678.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 19,
    entity: 'case',
    entityId: 5678,
  },
  {
    timestamp: 1720685205000, // 10 de julio de 2024, 23:46:45 GMT-0300
    type: 'new-resolution',
    message:
      'Una nueva resolución crítica (#1240) requiere tu atención inmediata.',
    userName: 'Sistema',
    userId: 0,
    notificationId: 20,
    entity: 'resolution',
    entityId: 1240,
  },
];
