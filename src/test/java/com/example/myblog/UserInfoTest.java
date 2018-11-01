//package com.example.myblog;
//
//import com.example.myblog.entity.UserInfo;
//import com.example.myblog.repository.UserInfoRepository;
//import com.example.myblog.service.UserInfoTestDemoService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import java.util.Vector;
//
///**
// * @auther : Dewey
// * @date : 2018/9/26 10 42
// * @description :
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest
//public class UserInfoTest {
//
//    @Autowired
//    UserInfoRepository userInfoRepository;
//
//    @Autowired
//    UserInfoTestDemoService userInfoTestDemoService;
//
//    @Test
//    public void saveTest(){
//
//        UserInfo userInfo = new UserInfo();
//        userInfo.setUsername("xlz");
//        userInfo.setUserMail("xlz@123.com");
//
//        userInfoRepository.save(userInfo);
//    }
//
//    @Test
//    public void multiThreadTest() throws Exception {
//
//        Vector<Thread> threads = new Vector<>();
//
//        for (int i = 0 ; i < 5 ; i++){
//            Thread thread = new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    UserInfo userInfo = new UserInfo();
//                    userInfo.setUserMail("dewey@123.com");
//                    userInfo.setId(1L);
//                    userInfo.setUsername("dewey");
//                    try {
//
//                        userInfoTestDemoService.userInfoSave(userInfo);
//                        System.out.println("子进程运行……");
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//            });
//
//            threads.add(thread);
//            thread.start();
//        }
//
//        for (Thread temp: threads) {
//            temp.join();
//        }
//        System.out.println("主进程运行");
//    }
//
//    @Test
//    public void saveOneTest(){
//        UserInfo userInfo = new UserInfo();
//        userInfo.setUserMail("dewey@123.com");
//        userInfo.setUsername("dewey");
//        try {
//            userInfoTestDemoService.userInfoSave(userInfo);
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Test
//    public void saveLoopTest(){
//
//        for (int i = 0 ; i < 5 ; i++){
//
//
//        UserInfo userInfo = new UserInfo();
//        userInfo.setUserMail("dewey@123.com");
//        userInfo.setUsername("dewey");
//        try {
//            userInfoTestDemoService.userInfoSave(userInfo);
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        }
//    }
//
//    @Test
//    public void transactionTest(){
//        UserInfo userInfo1 = new UserInfo();
//        userInfo1.setUsername("xlz");
//        userInfo1.setUserMail("xlz@121.com");
//
//        UserInfo userInfo2 = new UserInfo();
//        userInfo2.setUsername("dewey");
//        userInfo2.setUserMail("dewey@121.com");
//
//        userInfoTestDemoService.saveTwoUser(userInfo1,userInfo2);
//    }
//}
