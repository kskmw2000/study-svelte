import { MongoClient } from "mongodb";  // mongodb 임포트
import { nanoid } from "nanoid";        // 랜덤 문자열 발생시켜주는 nanoid 추가

import { connectUrl } from "$lib/dbURL";

export async function get(request) {
  const client = await MongoClient.connect(connectUrl);
  let scoreList = [];
  try {
    const db = await client.db('brainColor');
    
    /* 데이터 가져오기 */
    scoreList = await db.collection('score')
                  .find()
                  .sort( { score: -1} )
                  .limit(10)
                  .toArray();
    
    return {
      status: 200,
      body: {
        list: scoreList 
      }
    }
  } catch(e) {
    return {
      status: 500,
      body: {
        list: [],
        meg: e.message
      }
    }
  } finally {
    await client.close();
    console.log('database close')
  }
}

export async function put(request) {
  const client = await MongoClient.connect(connectUrl);
  let rtn = {};
  let score = JSON.parse(request.body);

  /* 입력 형식 체크 */
  if(!score.name || !score.score) {
    console.log(score);
    throw "잘못된 형식입니다.";
  }
  score["_id"] = nanoid();

  try {
    const db = await client.db('brainColor');

    /* 데이터 저장하기 코드 작성하기 */
    rtn = await db.collection("score").insertOne(score);  // db삽입

    return {
      status: 200,
      body: {
        result: rtn
      }
    }
  } catch(e) {
    return {
      status: 500,
      body: {
        meg: e.message
      }
    }
  } finally {
    await client.close();
    console.log("database colse");
  }
}