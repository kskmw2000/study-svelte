<script>
  import { goto } from '$app/navigation';
  import { score, scoreList } from '$lib/store';

  let name = '--';
  let bodyData; // Rest API PUT 메서드로 보낼 변수 선언
  let disabled = false; // 비활성화 삼태 모드 변수 선언
  let message = '이름을 입력하고 저장 버튼을 누르세요.'; // 최초 안내 메세지

  // HTML 블록에 값 name이 변경되면 bodyData를 자동으로 업데이트 함.
  $: bodyData = { score: $score, name: name };

  // fetch 사용을 위해서 비동기 함수로 변경
  async function saveScore() {
    /*
    // 내 점수를 scoreList 에 넣습니다.
    $scoreList.push({ score: $score, name: name });
    
    // 정렬을 합니다.
    $scoreList.sort((a, b) => { return b.score - a.score });

    // 10개를 맞추기 위해서 한 개를 까내어 버립니다.
    $scoreList.pop();

    // 홈으로 이동
    goto("/");
    */

    // 진입과 동시에 disabled를 true로 바꿈 => 컨트롤 비활성화
    disabled = true;

    // 사용자에게 점수 저장으로 보이도록 메세지 변경
    message = '점수 저장 중...';

    // 서버 REST API PUT Method 호출
    let rtn = await fetch('/api/score', {
      method: 'PUT',
      body: JSON.stringify(bodyData)
    });

    // await 종료 후 팝업
    if (rtn.status === 200) {
      alert('저장되었습니다.');
    }

    // 홈으로 화면 이동
    goto('/');
  }
</script>

<svelte:head>
  <title>점수 저장하기</title>
</svelte:head>

<h1 style="text-align:center;">점수 저장하기</h1>

<!-- <h4>이름을 입력하고 저장 버튼을 누르세요.</h4> -->
<h4>{message}</h4>
<p>획득 점수: {$score}</p>

<!-- <p>이름: <input type="text" bind:value={name}/></p>
<button on:click="{saveScore}">저장</button> -->

<p>이름: <input type="text" bind:value={name} {disabled} /></p>
<button on:click={saveScore} {disabled}>저장</button>
