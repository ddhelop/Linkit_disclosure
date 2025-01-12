import { Client } from '@stomp/stompjs'

const createStompClient = (accessToken: string) => {
  const stompClient = new Client({
    brokerURL: 'wss://dev.liaison-dev.site/stomp/linkit', // WebSocket URL
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`, // 따옴표 추가
    },
    beforeConnect: () => {
      stompClient.connectHeaders = {
        Authorization: `Bearer ${accessToken}`, // 연결 전에 헤더 재설정
      }
    },
    debug: (str) => console.log(str), // 디버깅 메시지 출력
    reconnectDelay: 10000, // 연결이 끊긴 경우 재시도 간격 (ms)
    heartbeatIncoming: 4000, // 서버에서 수신하는 heartbeat (ms)
    heartbeatOutgoing: 4000, // 클라이언트에서 보내는 heartbeat (ms)
  })

  // WebSocket 연결 활성화
  stompClient.activate()
  console.log('stompClient', stompClient)

  // 연결 종료 예시 (사용하지 않을 때)
  // stompClient.deactivate();

  return stompClient
}

export default createStompClient
