package models

import (
	"io/ioutil"
	"github.com/lightspread/WebOnPeach/modules/setting"
	"fmt"
	"encoding/json"
	"github.com/Unknwon/log"
	"path"
)

type SampleItems []struct {
	Name     string `json:"name"`
	Catagory string `json:"catagory"`
	Artist   string `json:"artist"`
	Desc     string `json:"desc"`
	FileLocation string `json:"filelocation"`
	Img1  string `json:"img1"`
	Img2 string `json:"img2"`
}


var (
	cachelistzhCN SampleItems
    cachelistenUS SampleItems
	listfilezhCN string = "lists_zh-CN.json"
    listfileenUS string = "lists_en-US.json"
)

const (
	Locale_zh = iota
	Locale_en
)



func GetSampleLists(locale int) (SampleItems,error) {
	switch locale {
	case Locale_en:
		if cachelistenUS !=nil {
			return  cachelistenUS,nil
		} else {
			err := ReloadSampleLists(locale)
			return cachelistenUS,err
		}
	default:
		if cachelistzhCN !=nil {
			return  cachelistzhCN,nil
		} else {
			err := ReloadSampleLists(locale)
			return cachelistzhCN,err
		}
	}
}

func ReloadSamplelists() (error) {
	err := ReloadSampleLists(Locale_zh)
	if err!=nil {
		return err
	}
	err2 := ReloadSampleLists(Locale_en)
	if err2!=nil {
		return err2
	}
	return nil
}

func ReloadSampleLists(locale int) (error) {
	listfile := listfilezhCN
	if locale==Locale_en {
		listfile = listfileenUS
	}
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

	if locale==Locale_en {
		cachelistenUS = samlists
	} else {
		cachelistzhCN = samlists
	}
	return nil
}