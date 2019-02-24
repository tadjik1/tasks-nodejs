const server = require('../server');
const request = require('request');
const assert = require('assert');
const fse = require('fs-extra');
const path = require('path');
const http = require('http');

const filesFolder = path.resolve(__dirname, '../files');
const fixturesFolder = path.resolve(__dirname, './fixtures');

describe('4-module-1-task', () => {
  describe('тесты на файловый сервер', () => {
    before(done => {
      fse.emptyDirSync(filesFolder);
      server.listen(3001, () => done());
    });
    after(done => {
      fse.emptyDirSync(filesFolder);
      fse.writeFileSync(path.join(filesFolder, '.gitkeep'), '');
      server.close(done);
    });
  
    beforeEach(() => {
      fse.emptyDirSync(filesFolder);
    });
  
    describe('GET', () => {
      it('файл отдается по запросу', done => {
        fse.copyFileSync(
          path.join(fixturesFolder, 'index.js'),
          path.join(filesFolder, 'index.js')
        );
  
        const content = fse.readFileSync(path.join(filesFolder, 'index.js'));
  
        request.get('http://localhost:3001/index.js', (err, response, body) => {
          if (err) return done(err);
  
          assert.strictEqual(response.statusCode, 200);
          assert.strictEqual(body, content.toString('utf-8'));
          done();
        });
      });
  
      it('если файла нет - отдается 404', done => {
        request.get('http://localhost:3001/not_exists.png', (error, response, body) => {
          if (error) return done(error);
  
          assert.strictEqual(response.statusCode, 404);
          done();
        });
      });
  
      it('если путь вложенный - возвращается ошибка 400', done => {
        request.get('http://localhost:3001/nested/path', (error, response, body) => {
          if (error) return done(error);
  
          assert.strictEqual(response.statusCode, 400);
          done();
        });
      });
    });
  
    describe.only('POST', () => {
      it('возвращается ошибка 409 при попытке создания файла, который уже есть', done => {
        fse.copyFileSync(
          path.join(fixturesFolder, 'small.png'),
          path.join(filesFolder, 'small.png'),
        );
  
        const mtime = fse.statSync(path.join(filesFolder, 'small.png')).mtime;
        const req = request.post('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);
  
          const newMtime = fse.statSync(path.join(filesFolder, 'small.png')).mtime;
  
          assert.deepStrictEqual(mtime, newMtime);
          assert.strictEqual(response.statusCode, 409);
          done();
        });
  
        fse.createReadStream(path.join(fixturesFolder, 'small.png')).pipe(req);
      });
  
      it('если тело запроса пустое возвращается ошибка 409 при попытке создания файла, который уже есть', done => {
        fse.copyFileSync(
          path.join(fixturesFolder, 'small.png'),
          path.join(filesFolder, 'small.png'),
        );
  
        const mtime = fse.statSync(path.join(filesFolder, 'small.png')).mtime;
  
        const req = request.post('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);
  
          const newMtime = fse.statSync(path.join(filesFolder, 'small.png')).mtime;
  
          assert.deepStrictEqual(mtime, newMtime);
          assert.strictEqual(response.statusCode, 409);
          done();
        });
  
        req.end();
      });
  
      it('при попытке создания слишком большого файла - ошибка 413', done => {
        const req = request(
          {uri: 'http://localhost:3001/big.png', method: 'POST'},
          (error, response, body) => {
            if (error) return done(error);
            
            assert.strictEqual(response.statusCode, 413);
  
            assert.strictEqual(
              fse.existsSync(path.join(filesFolder, 'big.png')),
              false
            );
  
            done();
          });
  
        req.on('error', err => {
          // EPIPE error should occur because we try to pipe after res closed
          if (err.code !== 'EPIPE') done(err);
        });
  
        fse.createReadStream(path.join(fixturesFolder, 'big.png'))
          .pipe(req);
  
      });
  
      it('успешное создание файла', done => {
        const req = request.post('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);
  
          assert.strictEqual(response.statusCode, 201);
  
          assert.ok(fse.existsSync(path.join(filesFolder, 'small.png')));
          done();
        });
  
        fse.createReadStream(path.join(fixturesFolder, 'small.png'),)
          .pipe(req);
      });
  
      it('файл не должен оставаться на диске при обрыве соединения', done => {
        const req = http.request('http://localhost:3001/example.txt', {
          method: 'POST'
        });
  
        req.on('error', err => {
          if (err.code !== 'ECONNRESET') return done(err);
  
          assert.strictEqual(
            fse.existsSync(path.join(filesFolder, 'example.txt')),
            false
          );
          done();
        });

        req.on('response', res => {
          assert.fail('there should be no response');
        });
  
        req.write('content');
  
        setTimeout(() => {
          req.abort();
        }, 300);
      });
    });
  
    describe('DELETE', () => {
      it('файл должен удаляться', done => {
        fse.copyFileSync(
          path.join(fixturesFolder, 'small.png'),
          path.join(filesFolder, 'small.png'),
        );
  
        request.delete('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);
  
          assert.strictEqual(response.statusCode, 200);
  
          assert.strictEqual(
            fse.existsSync(path.join(filesFolder, 'small.png')),
            false
          );

          done();
        });
      });
  
      it('если файла нет - ошибка 404', done => {
        request.delete('http://localhost:3001/small.png', (error, response, body) => {
          if (error) return done(error);
  
          assert.strictEqual(response.statusCode, 404);
          done();
        });
      });
    });
  
  });
});
