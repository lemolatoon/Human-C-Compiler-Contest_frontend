import RuleIcon from '@mui/icons-material/Rule'
import {
  Typography,
  Box,
  AlertTitle,
  Alert,
  useMediaQuery,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { FC } from 'react'

import TextWithIcon from '@/components/atoms/TextWithIcon'

type RegulationProps = {
  sx?: SxProps<Theme>
}

const Regulation: FC<RegulationProps> = ({ sx }) => {
  const isUpMd = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: { xs: '1rem', md: '3rem' },
        borderRadius: '10px',
        ...sx,
      }}
    >
      <TextWithIcon
        sx={{
          pb: { xs: '1rem', md: '3rem' },
        }}
      >
        <RuleIcon sx={{ mr: '1rem', fontSize: '3rem' }} />
        <Typography
          variant={isUpMd ? 'h3' : 'h4'}
          component='div'
          align='center'
          sx={{
            fontWeight: '800',
          }}
        >
          Regulation
        </Typography>
      </TextWithIcon>

      <Box sx={{ lineHeight: '1.5rem' }}>
        <Box sx={{ mb: '2rem' }}>
          <h3>A. 競技概要</h3>
          <div>
            <ol>
              <li>
                本コンテストは与えられたC言語のソースコードを決められた仕様に沿って解釈し対象となるアーキテクチャのアセンブリを出力する競技である．
              </li>
              <li>
                競技者は，与えられたソースコードが仕様上正しければ（コンパイル可能なら）アセンブリに変換し，ソースコードが仕様上正しくなければ（コンパイルエラーを出すべきなら）変換を行わずコンパイル不可であることを示す．
              </li>
              <li>
                第1回大会では以下の仕様を基準に競技を行う．
                <ol>
                  <li>C言語の仕様はC99に則る ．</li>
                  <li>ABIの仕様はSystem Vの仕様に従う ．</li>
                  <li>対象アーキテクチャはx86_64とする．</li>
                  <li>記法はAT&amp;Tとintel記法の双方を許可する．</li>
                </ol>
              </li>
              <li>
                第1回大会では評価基準を以下のように定める．
                <ol>
                  <li>各問題に点数を与えその得点で評価を行う．</li>
                  <li>得点が同じ場合は回答を提出した順番で順位づけを行う．</li>
                  <li>誤答した場合は時間でペナルティを課す．</li>
                  <li>
                    誤答のうちコンパイルできるはずのものにコンパイルエラーを出した場合より重いペナルティを課す．
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </Box>

        <Box sx={{ mb: '2rem' }}>
          <h3>B. 競技システム</h3>
          <div>
            <ol>
              <li>
                回答が正しいかどうかはジャッジシステムで行う．ジャッジシステムはテストケースを与えたり問題につけられた制約を確認する．
              </li>
              <li>
                誤答した場合ジャッジシステムは以下のいずれかの結果を返す．
                <ul>
                  <li>AC: 正答．</li>
                  <li>WA: テストケースの出力が正しくない．</li>
                  <li>AE: アセンブラ上のエラー．</li>
                  <li>LE: リンカ上のエラー．</li>
                  <li>TLE: 制限時間オーバー．</li>
                </ul>
              </li>
            </ol>
          </div>
        </Box>

        <Alert
          variant='outlined'
          severity='success'
          sx={{
            color: 'white',
            mb: '2rem',
            lineHeight: '2rem',
            borderWidth: '3px',
          }}
        >
          <AlertTitle sx={{ fontWeight: '900' }}>C. 許可事項</AlertTitle>
          <Typography component='div'>
            <ol>
              <li>紙，鉛筆，電卓などを用いること．</li>
              <li>指定された仕様書の閲覧．</li>
              <li>指定された検証環境を使ってローカルでデバッグを行う．</li>
              <li>検証環境内でのgdbの使用．</li>
              <li>人間による恣意的な最適化 ．</li>
            </ol>
          </Typography>
        </Alert>
        <Alert
          severity='error'
          variant='outlined'
          sx={{
            color: 'white',
            mb: '3rem',
            lineHeight: '2rem',
            borderWidth: '3px',
          }}
        >
          <AlertTitle sx={{ fontWeight: '900' }}>D. 禁止事項</AlertTitle>
          <Typography component='div'>
            <ol>
              <li>既存のコンパイラを使用すること．</li>
              <li>その他既存のツールを使用すること．</li>
              <li>コンパイラやツールを自作して使用すること．</li>
              <li>他者と回答を共有すること．</li>
              <li>回答にジャッジサーバを攻撃するような処理を埋め込むこと．</li>
            </ol>
          </Typography>
        </Alert>
      </Box>
    </Box>
  )
}

export default Regulation
