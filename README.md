This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

discord.py
==========

.. image:: https://discord.com/api/guilds/336642139381301249/embed.png
   :target: https://discord.gg/nXzj3dg
   :alt: Discordサーバーの招待
.. image:: https://img.shields.io/pypi/v/discord.py.svg
   :target: https://pypi.python.org/pypi/discord.py
   :alt: PyPIのバージョン情報
.. image:: https://img.shields.io/pypi/pyversions/discord.py.svg
   :target: https://pypi.python.org/pypi/discord.py
   :alt: PyPIのサポートしているPythonのバージョン

discord.py は機能豊富かつモダンで使いやすい、非同期処理にも対応したDiscord用のAPIラッパーです。

主な特徴
-------------

- ``async`` と ``await`` を使ったモダンなPythonらしいAPI。
- 適切なレート制限処理
- メモリと速度の両方を最適化。

インストール
-------------

**Python 3.8 以降のバージョンが必須です**

完全な音声サポートなしでライブラリをインストールする場合は次のコマンドを実行してください:

.. code:: sh

    # Linux/macOS
    python3 -m pip install -U discord.py

    # Windows
    py -3 -m pip install -U discord.py

音声サポートが必要なら、次のコマンドを実行しましょう:

.. code:: sh

    # Linux/macOS
    python3 -m pip install -U discord.py[voice]

    # Windows
    py -3 -m pip install -U discord.py[voice]


開発版をインストールしたいのならば、次の手順に従ってください:

.. code:: sh

    $ git clone https://github.com/Rapptz/discord.py
    $ cd discord.py
    $ python3 -m pip install -U .[voice]


オプションパッケージ
~~~~~~~~~~~~~~~~~~~~~~

* PyNaCl (音声サポート用)

Linuxで音声サポートを導入するには、前述のコマンドを実行する前にお気に入りのパッケージマネージャー(例えば ``apt`` や ``dnf`` など)を使って以下のパッケージをインストールする必要があります:

* libffi-dev (システムによっては ``libffi-devel``)
* python-dev (例えばPython 3.8用の ``python3.8-dev``)

簡単な例
--------------

.. code:: py

    import discord

    class MyClient(discord.Client):
        async def on_ready(self):
            print('Logged on as', self.user)

        async def on_message(self, message):
            # don't respond to ourselves
            if message.author == self.user:
                return

            if message.content == 'ping':
                await message.channel.send('pong')

    intents = discord.Intents.default()
    intents.message_content = True
    client = MyClient(intents=intents)
    client.run('token')

Botの例
~~~~~~~~~~~~~

.. code:: py

    import discord
    from discord.ext import commands

    intents = discord.Intents.default()
    intents.message_content = True
    bot = commands.Bot(command_prefix='>', intents=intents)

    @bot.command()
    async def ping(ctx):
        await ctx.send('pong')

    bot.run('token')

examplesディレクトリに更に多くのサンプルがあります。

リンク
------

- `ドキュメント <https://discordpy.readthedocs.io/ja/latest/index.html>`_
- `公式Discordサーバー <https://discord.gg/nXzj3dg>`_
- `Discord API <https://discord.gg/discord-api>`_
