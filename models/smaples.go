package models

import (
	"io/ioutil"
	"../modules/setting"
	"fmt"
	"encoding/json"
	"github.com/Unknwon/log"
	"path"
)

type SampleItems []struct {
	Name     string `json:"name"`
	Catagory string `json:"catagory"`
	Artist   string `json:"artist"`
	Desc     struct {
		EnUS string `json:"en_US"`
		ZhCN string `json:"zh_CN"`
	} `json:"desc"`
	Img  string `json:"img"`
	Img2 string `json:"img2"`
}



var (
	cachelist SampleItems
	listfile string = "lists.json"
)



func GetSampleLists() (SampleItems,error) {
	if cachelist !=nil {
		return  cachelist,nil
	} else {
		err := ReloadSampleLists()
    	return cachelist,err
	}
}

func ReloadSampleLists() (error) {
	var samlists SampleItems
	bytes, err := ioutil.ReadFile(path.Join(setting.Docs.Samples,listfile))
	if err != nil {
		log.Error("Fail to read samples from source(%s): %v - %s", path.Join(setting.Docs.Samples,listfile), err)
		return  fmt.Errorf("Fail to read samples from source(%s): %v - %s",  path.Join(setting.Docs.Samples,listfile), err)
	}

	if err := json.Unmarshal(bytes,&samlists); err!=nil {
		log.Error("Fail to read samples from source(%s): %v - %s", setting.Docs.Samples, err)
		return  fmt.Errorf("Fail to read samples from source(%s): %v - %s", setting.Docs.Samples, err)
	}

	cachelist = samlists
	return nil
}