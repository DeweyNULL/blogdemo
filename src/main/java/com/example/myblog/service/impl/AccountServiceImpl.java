/**
 * @program myblog
 * @description: AccountService impl
 * @author: xielinzhi
 * @create: 2018/11/22 15:11
 */


package com.example.myblog.service.impl;

import com.example.myblog.entity.User;
import com.example.myblog.repository.AccountRepository;
import com.example.myblog.service.AccountService;
import com.example.myblog.tools.SHA256Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    AccountRepository accountRepository;


    @Override
    public boolean getAccountInfo(User user) {
        User realUser = accountRepository.getByUsername(user.getUsername());
        if(realUser == null){
            return false;
        }
        String password = SHA256Util.getSHA256StrJava(SHA256Util.getSHA256StrJava(realUser.getPassword()));
        logger.info("dbuser.password:"+password);
        if(password.equals(user.getPassword())){


            return true;
        }
        return false;
    }
}
