package com.example.myblog.service;

import com.example.myblog.entity.UserInfo;
import com.example.myblog.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/26 10 34
 * @description :
 */

@Service
public class UserInfoTestDemoService {

    @Autowired
    UserInfoRepository userInfoRepository;



    @Transactional
    @Modifying
    public synchronized void userInfoSave(UserInfo userInfo) throws InterruptedException {
        System.out.println(Thread.currentThread()+" 进入方法");
        List<UserInfo> list = userInfoRepository.findByUsername(userInfo.getUsername());
        Thread.sleep(2000);
        if(list.size()==1){
            list.get(0).setUserMail(userInfo.getUserMail());

            System.out.println(list.get(0).toString());
        }else if(list.size()==0){
            userInfoRepository.save(userInfo);
            System.out.println(Thread.currentThread()+" 存储成功");
        }else {
            System.out.println("存在多于两个实体的错误");
        }
    }


    @Transactional
    public  void saveTwoUser(UserInfo userInfo1,UserInfo userInfo2){

        userInfoRepository.save(userInfo1);

        int i = 1/0;

        userInfoRepository.save(userInfo2);

    }
}
